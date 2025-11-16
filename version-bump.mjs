import fs from 'node:fs';

const targetVersion = process.env.npm_package_version;

// Read minAppVersion from manifest.json and bump version to target version
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, '\t'));

// Update versions.json with target version and minAppVersion from manifest.json
// but only if the target version is not already in versions.json
const versions = JSON.parse(fs.readFileSync('versions.json', 'utf8'));
if (Object.values(versions).includes(minAppVersion) === false) {
  versions[targetVersion] = minAppVersion;
  fs.writeFileSync('versions.json', JSON.stringify(versions, null, '\t'));
}
