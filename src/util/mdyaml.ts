import { isSurrounded, unquote } from "./string";


export type ParsableValue = string | number | boolean;
export type YAMLData = Record<string, any>;

export type MarkdownYAML = {
    data: YAMLData,
    content: string
};

const YAML_HEADER_BOUND = "---";

export function parseStringLine(text: string): ParsableValue {
    text = text.trim();

    if(isSurrounded(text,"\"") || isSurrounded(text, "'")) {
        return unquote(text);
    }

    const asNumber = parseFloat(text);
    
    if(!isNaN(asNumber)) {
        return asNumber;
    }

    if(text == "true") {
        return true;
    }

    if(text == "false") {
        return false;
    }

    return text;
}

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
            let val: ParsableValue = split[1];
            
            if(val == undefined) {
                val = "";
            } else {
                val = parseStringLine(val);
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
