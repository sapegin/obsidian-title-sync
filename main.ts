import { Plugin, type TAbstractFile, TFile } from 'obsidian';

function getBasename(filepath: string) {
  return filepath.split(/[/\\]/).pop()?.replace(/\.md$/, '') ?? '';
}

export default class TitleSyncPlugin extends Plugin {
  private handleRename = (file: TAbstractFile, oldPath: string) => {
    // Skip folders
    if (file instanceof TFile === false) {
      return;
    }

    const newMetadata = this.app.metadataCache.getFileCache(file);
    const oldMetadata = this.app.metadataCache.getCache(oldPath);
    const metadata = newMetadata ?? oldMetadata;
    const h1 = metadata?.headings?.find((x) => x.level === 1);
    const oldFilename = getBasename(oldPath);

    if (h1 === undefined) {
      // No heading in Markdown file, add a new one
      void this.app.vault.process(file, (contents) => {
        const newHeading = `# ${file.basename}`;
        if (metadata?.frontmatterPosition) {
          // If file has frontmatter, add new heading after it
          const frontmatterEndOffset = metadata.frontmatterPosition.end.offset;
          const beforeFrontmatter = contents.slice(0, frontmatterEndOffset);
          const afterFrontmatter = contents.slice(frontmatterEndOffset);
          return `${beforeFrontmatter.trimEnd()}\n${newHeading}\n${afterFrontmatter.trimStart()}`;
        } else {
          // Otherwise, add new heading right at the beginning
          return `${newHeading}\n${contents.trimStart()}`;
        }
      });
    } else if (h1.heading.trim() === oldFilename) {
      // The old filename matches the existing Markdown heading: update the
      // heading in Markdown
      void this.app.vault.process(file, (contents) => {
        // Read the heading text from Markdown to be sure it matches the value
        // in metadata cache — to avoid data corruption
        const oldHeading = contents
          .slice(h1.position.start.offset + 1, h1.position.end.offset)
          .trim();
        if (oldHeading === oldFilename) {
          const beforeHeading = contents.slice(0, h1.position.start.offset);
          const afterHeading = contents.slice(h1.position.end.offset);
          const newHeading = `# ${file.basename}`;
          return `${beforeHeading}${newHeading}${afterHeading}`;
        } else {
          return contents;
        }
      });
    }
  };

  public onload() {
    this.registerEvent(this.app.vault.on('rename', this.handleRename));
  }

  public onunload() {}
}
