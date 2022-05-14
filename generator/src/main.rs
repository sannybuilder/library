use collections::{BTreeMap, HashMap};
use convert_case::{Case, Casing};
use serde::{Deserialize, Serialize};
use serde_json::Result;
use std::{
    collections,
    fs::{self, DirEntry},
    io,
    path::Path,
};

#[derive(Serialize, Deserialize, Debug)]
struct Attr {
    is_branch: Option<bool>,
    is_condition: Option<bool>,
    is_constructor: Option<bool>,
    is_destructor: Option<bool>,
    is_keyword: Option<bool>,
    is_nop: Option<bool>,
    is_overload: Option<bool>,
    is_segment: Option<bool>,
    is_static: Option<bool>,
    is_unsupported: Option<bool>,
    is_variadic: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Param {
    r#name: String,
    r#source: Option<String>,
    r#type: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Command {
    attrs: Option<Attr>,
    class: Option<String>,
    id: String,
    member: Option<String>,
    name: String,
    num_params: i32,
    #[serde(default)]
    input: Vec<Param>,
    #[serde(default)]
    output: Vec<Param>,
    short_desc: Option<String>,
    #[serde(default)]
    platforms: Vec<String>,
    #[serde(default)]
    versions: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Extension {
    name: String,
    commands: Vec<Command>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Meta {
    last_update: u64,
    url: String,
    version: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Library {
    meta: Meta,
    extensions: Vec<Extension>,
}

fn visit_dirs(dir: &Path, cb: &mut dyn FnMut(&DirEntry) -> Option<()>) -> io::Result<()> {
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                visit_dirs(&path, cb)?;
            } else {
                cb(&entry);
            }
        }
    }
    Ok(())
}

fn does_command_match_target(command: &Command, target: &str) -> bool {
    match target {
        "gta3" | "vc" | "sa" => {
            if !command.platforms.is_empty()
                && !(command.platforms.contains(&"any".to_string())
                    || command.platforms.contains(&"pc".to_string()))
            {
                return false;
            }

            if !command.versions.is_empty()
                && !(command.versions.contains(&"any".to_string())
                    || command.versions.contains(&"1.0".to_string()))
            {
                return false;
            }
        }
        "gta3_mobile" | "vc_mobile" | "sa_mobile" => {
            if !command.platforms.is_empty()
                && !(command.platforms.contains(&"any".to_string())
                    || command.platforms.contains(&"mobile".to_string()))
            {
                return false;
            }

            // should be impossible to have 1.0 [DE] on mobile platform (now) but adding this check anyway
            if command.versions.len() == 1 && command.versions.contains(&"1.0 [DE]".to_string()) {
                return false;
            }
        }
        "gta3_unreal" | "vc_unreal" | "sa_unreal" => {
            if !command.platforms.is_empty()
                && !(command.platforms.contains(&"any".to_string())
                    || command.platforms.contains(&"pc".to_string()))
            {
                return false;
            }

            if !command.versions.is_empty()
                && !(command.versions.contains(&"any".to_string())
                    || command.versions.contains(&"1.0 [DE]".to_string()))
            {
                return false;
            }
        }
        _ => {
            // do nothing
        }
    };
    return true;
}

fn generate_keywords() -> Result<()> {
    let args: Vec<String> = std::env::args().collect();
    let input_file = args
        .get(2)
        .unwrap_or_else(|| panic!("Provide input file name"));
    let target = args.get(3).unwrap_or_else(|| panic!("Provide target name"));

    let content = fs::read_to_string(input_file).unwrap();
    let library = serde_json::from_str::<Library>(content.as_str())?;

    let commands = library
        .extensions
        .iter()
        .flat_map(|ext| ext.commands.iter())
        .collect::<Vec<_>>();

    let mut keywords_list: BTreeMap<String, String> = BTreeMap::new();

    for command in commands.into_iter().filter(|command| {
        if !does_command_match_target(command, &target) {
            return false;
        }
        command
            .attrs
            .as_ref()
            .and_then(|a| a.is_keyword)
            .unwrap_or(false)
    }) {
        keywords_list.insert(command.id.clone(), command.name.to_ascii_lowercase());
    }

    for (op, name) in keywords_list {
        println!("{}={}", op, name);
    }

    Ok(())
}

fn generate_snippets() -> io::Result<()> {
    let mut snippets: BTreeMap<String, BTreeMap<String, String>> = BTreeMap::new();
    let args: Vec<String> = std::env::args().collect();
    let source_dir = args
        .get(2)
        .unwrap_or_else(|| panic!("Provide source directory path"));

    visit_dirs(&Path::new(source_dir), &mut |f| -> Option<()> {
        let content = fs::read_to_string(f.path()).ok()?;
        let path = f.path();
        let mut c = path.components();

        let extension: String = c.nth_back(1)?.as_os_str().to_str()?.into();
        let map = snippets.entry(extension).or_insert(BTreeMap::new());
        map.insert(f.path().file_stem()?.to_str()?.into(), content);
        Some(())
    })?;

    let json = serde_json::to_string_pretty(&snippets)?;
    println!("{}", json);

    Ok(())
}

fn generate_classes() -> Result<()> {
    let args: Vec<String> = std::env::args().collect();
    let input_file = args
        .get(2)
        .unwrap_or_else(|| panic!("Provide input file name"));

    let target = args.get(3).unwrap_or_else(|| panic!("Provide target name"));

    let content = fs::read_to_string(input_file).unwrap();
    let library = serde_json::from_str::<Library>(content.as_str())?;

    let commands = library
        .extensions
        .iter()
        .flat_map(|ext| ext.commands.iter())
        .collect::<Vec<_>>();

    let mut classes_list: HashMap<String, HashMap<String, String>> = HashMap::new();

    for command in commands {
        if !command.class.is_some() || !command.member.is_some() {
            continue;
        }

        if !does_command_match_target(command, &target) {
            continue;
        }

        let class_name = command.class.as_ref().unwrap().to_case(Case::Pascal);
        let class_member = command.member.as_ref().unwrap().to_case(Case::Pascal);

        if !classes_list.contains_key(&class_name) {
            classes_list.insert(class_name.clone(), HashMap::new());
        }

        let map = classes_list.get_mut(&class_name).unwrap();

        let is_condition = match command.attrs.as_ref() {
            Some(attr) if attr.is_condition.is_some() => 1,
            _ => 0,
        };

        let params: Vec<String> = command
            .input
            .iter()
            .chain(command.output.iter())
            .map(|p| {
                if p.name.len() == 0 {
                    String::from("")
                } else {
                    let _type = match p.r#type.to_ascii_lowercase().as_str() {
                        "float" => String::from("%f"),
                        "int" => String::from("%i"),
                        "string" => String::from("%s"),
                        "bool" | "boolean" => String::from("%b"),
                        _ => format!(": {}", p.r#type),
                    };
                    format!("\"{}{}\"", p.name, _type)
                }
            })
            .collect();

        let description = format!(
            "{},{},{},({})",
            command.id.trim(),
            is_condition,
            0,
            params.join(" ")
        );
        map.insert(class_member, description);
    }

    let mut classes_names: Vec<&str> = classes_list.keys().map(|line| line.trim()).collect();
    classes_names.sort();

    println!("; autogenerated from {}\n", input_file);
    println!("#CLASSESLIST");

    for class_name in classes_names.iter() {
        println!("{}", class_name);
    }

    println!("\n#CLASSES");

    for &class_name in classes_names.iter() {
        println!("${}", class_name.trim());
        println!("$BEGIN");

        let members = classes_list.get(class_name).unwrap();
        let mut member_names: Vec<&String> = members.keys().collect();
        member_names.sort();

        for member_name in member_names {
            let description = members.get(member_name).unwrap();
            println!("{},{}", member_name, description);
        }

        println!("$END\n");
    }

    println!("#EOF");

    Ok(())
}

fn generate_enums() -> Result<()> {
    let args: Vec<String> = std::env::args().collect();
    let input_file = args
        .get(2)
        .unwrap_or_else(|| panic!("Provide input file name"));

    let content = fs::read_to_string(input_file).unwrap();

    let enums =
        serde_json::from_str::<serde_json::map::Map<String, serde_json::Value>>(content.as_str())?;

    for (enum_name, enum_fields) in enums {
        println!("enum {}", enum_name);

        match enum_fields {
            serde_json::Value::Object(v) => {
                for (field_name, field_value) in v {
                    print!("\t{}", field_name);

                    match field_value {
                        serde_json::Value::Number(v) => print!("={}", v),
                        serde_json::Value::String(v) => print!("=\"{}\"", v),
                        _ => {}
                    }

                    println!();
                }
            }
            _ => {}
        }

        println!("end\n");
    }

    Ok(())
}

fn main() {
    let args: Vec<String> = std::env::args().collect();
    match args.get(1) {
        Some(x) if x == "classes" => generate_classes().ok(),
        Some(x) if x == "snippets" => generate_snippets().ok(),
        Some(x) if x == "enums" => generate_enums().ok(),
        Some(x) if x == "keywords" => generate_keywords().ok(),
        Some(x) => {
            panic!("unknown action argument {}", x);
        }
        None => {
            panic!("missing action argument");
        }
    };
}
