echo "Running plugin build script"
cd react-app && \
yarn install --cache-folder=".yarn-cache" && \
echo "✓ dependencies installed successfully" && \
yarn build && \
echo "✓ built successfully" && \
yarn test --watchAll=false && \
echo "✓ tests run successfully" && \
cd .. && \
yarn install-plugin && \
echo "✓ plugin setup successfully" && \
echo "✓ plugin installed successfully"