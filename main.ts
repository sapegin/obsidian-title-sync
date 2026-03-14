import { Plugin, type TAbstractFile, TFile } from 'obsidian';

const FRONTMATTER_REGEX = /^---\r?\n[\s\S]*?\r?\n---/;
const H1_REGEX = /^# (.+)$/m;

function getBasename(filepath: string) {
  return filepath.split(/[/\\]/).pop()?.replace(/\.md$/, '') ?? '';
}

export default class TitleSyncPlugin extends Plugin {
  private handleRename = (file: TAbstractFile, oldPath: string) => {
    // Skip folders
    if (file instanceof TFile === false) {
      return;
    }

    const oldFilename = getBasename(oldPath);

    void this.app.vault.process(file, (contents) => {
      const newHeading = `# ${file.basename}`;

      // Strip frontmatter to search for H1 in the body
      const frontmatterMatch = contents.match(FRONTMATTER_REGEX);
      const bodyStart = frontmatterMatch ? frontmatterMatch[0].length : 0;
      const body = contents.slice(bodyStart);

      const h1Match = body.match(H1_REGEX);

      if (h1Match === null) {
        // No heading found, add a new one
        if (frontmatterMatch) {
          const frontmatter = contents.slice(0, bodyStart);
          return `${frontmatter.trimEnd()}\n\n${newHeading}\n\n${body.trimStart()}`;
        }
        return `${newHeading}\n\n${contents.trimStart()}`;
      }

      if (h1Match[1].trim() === oldFilename) {
        // Heading matches old filename, update it
        const h1Index = bodyStart + (h1Match.index ?? 0);
        const before = contents.slice(0, h1Index);
        const after = contents.slice(h1Index + h1Match[0].length);
        return `${before}${newHeading}${after}`;
      }

      return contents;
    });
  };

  public onload() {
    this.registerEvent(this.app.vault.on('rename', this.handleRename));
  }

  public onunload() {}
}
