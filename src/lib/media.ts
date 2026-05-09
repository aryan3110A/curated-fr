export const isRenderableImageUrl = (value?: string | null) => {
  if (!value) {
    return false;
  }

  return /^https?:\/\//i.test(value);
};

export const createPlaceholderPalette = (seed: string) => {
  const variants = [
    {
      shell: "from-beige via-cream to-white",
      orbA: "bg-sage/70",
      orbB: "bg-rose/60",
      orbC: "bg-gold/70",
    },
    {
      shell: "from-cream via-lavender/30 to-white",
      orbA: "bg-lavender/70",
      orbB: "bg-peach/60",
      orbC: "bg-sage/60",
    },
    {
      shell: "from-white via-peach/30 to-beige",
      orbA: "bg-gold/60",
      orbB: "bg-sage/70",
      orbC: "bg-peach/70",
    },
  ] as const;

  const hash = [...seed].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return variants[hash % variants.length];
};
