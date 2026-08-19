
export type YAMLData = Record<string, any>;

export type MarkdownYAML = {
    data: YAMLData,
    content: string
};

const YAML_HEADER_BOUND = "---";

export function parseMarkdownYaml(text: string): MarkdownYAML {
    let yamlStartLine = -1;
    let yamlEndLine = -1;

    const lines = text.split("\n");

    const data: YAMLData = {};

    for(let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        if(trimmedLine == YAML_HEADER_BOUND) {
            if(yamlStartLine == -1) {
                yamlStartLine = i;
            } else {
                yamlEndLine = i;
                break;
            }
        }

        if(yamlStartLine == -1 && trimmedLine != "\n") { // Got text before any YAML data
            return {
                data: {},
                content: text
            };
        }
    }

    return {
        data: data,
        content: lines.slice(yamlEndLine + 1).join("\n")
    };
}
