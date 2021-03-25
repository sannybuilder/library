cp ../gta3/gta3.json src/assets/gta3/gta3.json
cp ../vc/vc.json src/assets/vc/vc.json
node supported.js

cd ../generator
cargo run classes ../gta3/gta3.json > ../editor/src/assets/gta3/classes.db
cargo run classes ../vc/vc.json > ../editor/src/assets/vc/classes.db
cargo run snippets ../gta3/snippets > ../editor/src/assets/gta3/snippets.json
cargo run snippets ../vc/snippets > ../editor/src/assets/vc/snippets.json

