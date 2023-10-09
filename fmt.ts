import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import { Word, Response, History } from "./type.ts";

function etymologySentence(obj: Word) {
  let sentence = "";

  if (!obj?.etymologies?.length) return sentence;

  for (let i = 0; i < obj.etymologies.length; i++) {
    const etymology = obj.etymologies[i];
    const languageName = etymology.languages[0].name;
    const romanizedText = etymology.romanizedText;
    const definition = etymology.definition;
    const relationText = etymology.relation.text;
    const wordClassName = etymology.wordClass.name;

    sentence += `${languageName} ${romanizedText}- “${definition}” ${wordClassName}${relationText} `;

    if (i == 1) {
      const affixName = etymology.affixes.suffix?.name;
      if (affixName) sentence += `${languageName} ${affixName} ekiyle `;
    }
  }

  return sentence;
}

interface Item {
  description: string;
  etymology: string;
  histories: History[];
  name: string;
}

export const format = (data: Response) => {
  const items: Item[] = [];

  data.words.forEach((word) => {
    const item: Item = {
      etymology: etymologySentence(word),
      description: word.note,
      histories: word.histories,
      name: word.name,
    };

    items.push(item);
  });

  return items;
};

export const printAll = (items: Item[]) => {
  items.forEach((item) => {
    const result = `
    ${colors.bold.brightRed(item.name)}
    
    ${colors.green("Köken:")} ${item.etymology}
    ${colors.green("Ek Açıklama:")} ${item.description}
    ${colors.green("Tarihçe:")}
    
    ${item.histories
      ?.map(
        (h) =>
          `${colors.bold.white(h?.language?.name || "")} ${
            h.excerpt
          } [${colors.gray(h.source.book)}, ${colors.gray(
            String(h.dateSortable)
          )}] \n${h.quote}`
      )
      .join("\n")}
    `;

    console.log(
      result.replaceAll("%u", "").replaceAll("%i", "").replaceAll("%b", "")
    );
  });
};
