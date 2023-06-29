async function selectReviewers(config) {
  let selected = [];
  const author = "mariasimo";

  try {
    for (const {
      reviewers,
      internal_reviewers: internalReviewers,
      usernames,
    } of config.groups) {
      const reviewersToRequest =
        usernames.includes(author) && internalReviewers
          ? internalReviewers
          : reviewers;

      if (reviewersToRequest) {
        selected = selected.concat(
          pickRandom(usernames, reviewersToRequest, selected.concat(author))
        );
      }

      return selected;
    }
  } catch (error) {
    console.log(error);
  }

  return selected;
}

function pickRandom(items, n, ignore) {
  const picks = [];

  const candidates = items.filter((item) => !ignore.includes(item));

  while (picks.length < n) {
    const random = Math.floor(Math.random() * candidates.length);
    const pick = candidates.splice(random, 1)[0];

    if (!picks.includes(pick)) picks.push(pick);
  }

  return picks;
}

const reviewers = selectReviewers({
  groups: [
    {
      name: "test",
      reviewers: 2,
      internal_reviewers: 0,
      usernames: ["mariasimo", "coponstudio", "damianflores"],
    },
  ],
});

console.log({ reviewers });
