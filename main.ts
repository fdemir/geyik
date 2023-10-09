import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

import { getWord } from "./dictionary.ts";
import { format, printAll } from "./fmt.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";

const main = async () => {
  const { args: words } = await new Command()
    .name("geyik")
    .version("0.1.0")
    .arguments("<sozcuk> [output:string]")
    .description(
      "Geyik ile sözcüklerin kökenine kolayca bakın. Bütün veri nisanyansozluk.com'dan alınmıştır."
    )
    .parse(Deno.args);

  const target = words[0];

  try {
    const data = await getWord(target);

    const result = format(data);
    printAll(result);
  } catch (error) {
    console.log(colors.red(error.message));
    Deno.exit(1);
  }
};

main();
