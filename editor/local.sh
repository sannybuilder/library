mkdir -p ../editor/src/assets/gta3
mkdir -p ../editor/src/assets/vc
mkdir -p ../editor/src/assets/sa

mkdir -p ../editor/src/assets/gta3_mobile
mkdir -p ../editor/src/assets/vc_mobile
mkdir -p ../editor/src/assets/sa_mobile

mkdir -p ../editor/src/assets/gta3_unreal
mkdir -p ../editor/src/assets/vc_unreal
mkdir -p ../editor/src/assets/sa_unreal

cp ../gta3/gta3.json src/assets/gta3
cp ../gta3_mobile/gta3_mobile.json src/assets/gta3_mobile
cp ../gta3_unreal/gta3_unreal.json src/assets/gta3_unreal

cp ../vc/vc.json src/assets/vc
cp ../vc_mobile/vc_mobile.json src/assets/vc_mobile
cp ../vc_unreal/vc_unreal.json src/assets/vc_unreal

cp ../sa/sa.json src/assets/sa
cp ../sa_mobile/sa_mobile.json src/assets/sa_mobile
cp ../sa_unreal/sa_unreal.json src/assets/sa_unreal

cp ../gta3/enums.json src/assets/gta3
cp ../vc/enums.json src/assets/vc
cp ../sa/enums.json src/assets/sa

cd ../generator

cargo run enums ../gta3/enums.json > ../editor/src/assets/gta3/enums.txt
cargo run enums ../vc/enums.json > ../editor/src/assets/vc/enums.txt
cargo run enums ../sa/enums.json > ../editor/src/assets/sa/enums.txt

cargo run snippets ../gta3/snippets > ../editor/src/assets/gta3/snippets.json
cargo run snippets ../vc/snippets > ../editor/src/assets/vc/snippets.json
cargo run snippets ../sa/snippets > ../editor/src/assets/sa/snippets.json

cargo run classes ../gta3/gta3.json gta3_classic > ../editor/src/assets/gta3/classes.db
cargo run classes ../vc/vc.json vc_classic > ../editor/src/assets/vc/classes.db
cargo run classes ../sa/sa.json sa_classic > ../editor/src/assets/sa/classes.db

cargo run keywords ../gta3/gta3.json gta3_classic > ../editor/src/assets/gta3/keywords.txt
cargo run keywords ../vc/vc.json vc_classic > ../editor/src/assets/vc/keywords.txt
cargo run keywords ../sa/sa.json sa_classic > ../editor/src/assets/sa/keywords.txt

cargo run classes ../gta3_mobile/gta3_mobile.json gta3_mobile > ../editor/src/assets/gta3_mobile/classes.db
cargo run classes ../vc_mobile/vc_mobile.json vc_mobile > ../editor/src/assets/vc_mobile/classes.db
cargo run classes ../sa_mobile/sa_mobile.json sa_mobile > ../editor/src/assets/sa_mobile/classes.db

cargo run keywords ../gta3_mobile/gta3_mobile.json gta3_mobile > ../editor/src/assets/gta3_mobile/keywords.txt
cargo run keywords ../vc_mobile/vc_mobile.json vc_mobile > ../editor/src/assets/vc_mobile/keywords.txt
cargo run keywords ../sa_mobile/sa_mobile.json sa_mobile > ../editor/src/assets/sa_mobile/keywords.txt

cargo run classes ../gta3_unreal/gta3_unreal.json gta3_unreal > ../editor/src/assets/gta3_unreal/classes.db
cargo run classes ../vc_unreal/vc_unreal.json vc_unreal > ../editor/src/assets/vc_unreal/classes.db
cargo run classes ../sa_unreal/sa_unreal.json sa_unreal > ../editor/src/assets/sa_unreal/classes.db

cargo run keywords ../gta3_unreal/gta3_unreal.json gta3_unreal > ../editor/src/assets/gta3_unreal/keywords.txt
cargo run keywords ../vc_unreal/vc_unreal.json vc_unreal > ../editor/src/assets/vc_unreal/keywords.txt
cargo run keywords ../sa_unreal/sa_unreal.json sa_unreal > ../editor/src/assets/sa_unreal/keywords.txt