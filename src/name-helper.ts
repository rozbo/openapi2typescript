import Log from "./log";
import pinyin from "tiny-pinyin";
import ReservedDict from 'reserved-words';


export interface ResolveTypeNameFunc {
    (raw: string): string;
}

export let customResolveTypeName: ResolveTypeNameFunc | undefined;

export const setCustomResolveTypeName = (arg: ResolveTypeNameFunc) => {
    customResolveTypeName = arg
}
export const resolveTypeName = (typeName: string) => {
    if (customResolveTypeName !== undefined) {
        const ret = customResolveTypeName(typeName);
        if (ret) {
            return ret;
        }
    }
    if (ReservedDict.check(typeName)) {
        return `__openAPI__${typeName}`;
    }
    const typeLastName = getTypeLastName(typeName);

    const name = typeLastName
        .replace(/[-_ ](\w)/g, (_all, letter) => letter.toUpperCase())
        .replace(/[^\w^\s^\u4e00-\u9fa5]/gi, '');

    // 当model名称是number开头的时候，ts会报错。这种场景一般发生在后端定义的名称是中文
    if (name === '_' || /^\d+$/.test(name)) {
        Log('⚠️  models不能以number开头，原因可能是Model定义名称为中文, 建议联系后台修改');
        return `Pinyin_${name}`
    }
    if (!/[\u3220-\uFA29]/.test(name) && !/^\d$/.test(name)) {
        return name;
    }
    const noBlankName = name.replace(/ +/g, '')
    return pinyin.convertToPinyin(noBlankName, '', true);
};


export function getTypeLastName(name: string): string {
    return name.split('/').pop().split('.').pop();
}
