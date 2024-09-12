import "./style.css";

const tagElement = document.querySelector<HTMLDivElement>("#tag")!;
const currUrlElement = document.querySelector<HTMLDivElement>("#curr-url")!;
const generateTagButton =
  document.querySelector<HTMLButtonElement>("#generate-tag")!;

const tagDictionary = [
  {
    keyword: "google.com",
    tag: "haha123",
  },
  {
    keyword: "bing.com",
    tag: "haha321",
  },
];

const identifyTagFromUrl = (currUrl: string) => {
  const tag = tagDictionary.find((entry) =>
    currUrl.includes(entry.keyword),
  )?.tag;
  if (!tag) return "No tag found";
  return tag;
};

const generateTag = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currUrl = tabs[0].url;
    if (!currUrl) {
      currUrlElement.innerHTML = "No URL found";
      tagElement.innerHTML = "No tag found";
    } else {
      currUrlElement.innerHTML = currUrl;
      tagElement.innerHTML = identifyTagFromUrl(currUrl);
    }
  });
};

generateTagButton.addEventListener("click", generateTag);
