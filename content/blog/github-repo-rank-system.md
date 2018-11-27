+++
title = "A New GitHub Repository Rank Algorithm"
date = 2018-11-26T22:21:58-05:00
description = "GitHub stars have long been an insufficient means of determining a repository's worth. It's time for a new ranking system."
image = "https://bryanbugyi.com/images/github-rank-system.png"
draft = true
+++

Every budding Software Engineer longs for the day that one of their GitHub projects hits 100 stars. I am proud to say that I recently hit this coveted milestone (checkout [funky]). I have [this][HN] Hacker News post---which went viral for about 24 hours)---to thank for that.

At the time of this writing, [funky] has 317 stars on GitHub. With that said, I imagine that only a small percentage of the users who starred the project have actually continued to use it. In fact, I'm fairly confident that the project has been overcompensated (with stars) considering how much actual use it has seen from the developer community. Alas, I have come to a bitter conclusion regarding GitHub projects: *Stars != Usefulness*. This realization has led me on a search for a better way.

TLDR: **GitHub stars have long been an insufficient means of determining a repository's worth. It's time for a new ranking system.**

## New GitHub Rank Algorithm

In this section, I provide an example of an algorithm that I believe provides a better metric for how *useful* a GitHub project is to the developer community. From this point forward we shall refer to the idea of a GitHub repository's *worth* or *usefulness to the developer community* as the repository's **rank**. The rank algorithm is based on a simple pair of assumptions:

1) GitHub stars are unreliable for determining the repository rank, but are a good indicator of the amount of long-term traffic that the repository has seen.

2) GitHub forks represent a form of active *engagement* with the repository and are thus a more valuable metric for determining repository rank.

Keeping these two assumptions in mind, I propose the following algorithm:

```
if ★ < 50:
    bonus=0
    multiplier=3.0
elif 50 <= ★ < 100:
    bonus=0.5
    multiplier=1.5
elif 100 <= ★ < 1000:
    bonus=1
    multiplier=3
elif 1000 <= ★ < 10000:
    bonus=1.5
    multiplier=3.5
elif 10000 <= ★:
    bonus=2
    multiplier=3

rank = (multiplier × min{2×FORKS/STARS, 1}) + bonus
```

## Sample Scores for Select GitHub Repos

## Rank your GitHub Projects

## Other Possible Scoring Methods

## Can you do better?

[funky]: https://github.com/bbugyi200/funky
[HN]: https://news.ycombinator.com/item?id=18486191
