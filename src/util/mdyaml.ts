
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

        if(line == "") {
            continue;
        }

        if(trimmedLine == YAML_HEADER_BOUND) {
            if(yamlStartLine == -1) {
                yamlStartLine = i;
                continue;
            } else {
                yamlEndLine = i;
                break;
            }
        }

        if(yamlStartLine != -1) {
            const split = line.split(":");
            const key = split[0].trim();
            let val = split[1];
            
            if(val == undefined) {
                val = "";
            } else {
                val = val.trim();
            }

            data[key] = val;
        } else {
            // Got text before any YAML data
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
