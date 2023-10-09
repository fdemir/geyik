import { Response } from "./type.ts";

const generateURL = (word: string) => {
  const url = new URL("https://www.nisanyansozluk.com/api/words");

  url.searchParams.set(
    "session",
    crypto.getRandomValues(new Uint8Array(8)).join("-")
  );
  url.pathname += `/${word}`;

  return url;
};

enum ErrorType {
  SERVER_ERROR = "SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

const ErrorMeessage: Record<ErrorType, string> = {
  SERVER_ERROR: "Bir seyler yanlis gitti.",
  NOT_FOUND: "Aradiginiz sozcuk bulunamadi.",
};

export const getWord = async (word: string): Promise<Response> => {
  const url = generateURL(word);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(ErrorMeessage.SERVER_ERROR);
  }

  const json: Response = await response.json();

  if (json.isUnsuccessful) {
    throw new Error(ErrorMeessage.NOT_FOUND);
  }

  return json;
};
