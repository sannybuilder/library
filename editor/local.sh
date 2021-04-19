cp ../gta3/gta3.json src/assets/gta3
cp ../vc/vc.json src/assets/vc
cp ../sa/sa.json src/assets/sa

cp ../gta3/enums.json src/assets/gta3
cp ../vc/enums.json src/assets/vc
cp ../sa/enums.json src/assets/sa

node supported.js

cd ../generator
cargo run classes ../gta3/gta3.json > ../editor/src/assets/gta3/classes.db
cargo run classes ../vc/vc.json > ../editor/src/assets/vc/classes.db
cargo run classes ../sa/sa.json > ../editor/src/assets/sa/classes.db

cargo run snippets ../gta3/snippets > ../editor/src/assets/gta3/snippets.json
cargo run snippets ../vc/snippets > ../editor/src/assets/vc/snippets.json
cargo run snippets ../sa/snippets > ../editor/src/assets/sa/snippets.json

