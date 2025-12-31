@echo on
echo ==== BAT FILE STARTED ====

cd /d %WORKSPACE%
echo ==== AFTER CD ====

node -v
echo ==== AFTER NODE ====

npm -v
echo ==== AFTER NPM ====

npm install
echo ==== AFTER NPM INSTALL ====

npx playwright install
echo ==== AFTER PW INSTALL ====

npx playwright test
echo ==== AFTER TEST ====