@echo on
cd /d %WORKSPACE%
echo Current directory:
cd

node -v
npm -v

npm install
npx playwright install
npx playwright test