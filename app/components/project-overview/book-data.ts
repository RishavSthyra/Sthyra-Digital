export type BookSpread = {
  back: string;
  front: string;
};

const pictureNames = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
] as const;

export const bookSpreads: BookSpread[] = [
  {
    front: "book-cover",
    back: pictureNames[0],
  },
];

for (let index = 1; index < pictureNames.length - 1; index += 2) {
  bookSpreads.push({
    front: pictureNames[index % pictureNames.length],
    back: pictureNames[(index + 1) % pictureNames.length],
  });
}

bookSpreads.push({
  front: pictureNames[pictureNames.length - 1],
  back: "book-back",
});
