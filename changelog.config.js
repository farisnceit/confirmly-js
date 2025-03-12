module.exports = {
  types: [
    { type: 'feat', section: 'Added' },
    { type: 'fix', section: 'Fixed' },
    { type: 'chore', hidden: true },
    { type: 'docs', section: 'Documentation' },
    { type: 'style', section: 'Changed' },
    { type: 'refactor', section: 'Changed' },
    { type: 'perf', section: 'Changed' },
    { type: 'test', hidden: true },
  ],
  commitUrlFormat:
    'https://github.com/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat:
    'https://github.com/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
  userUrlFormat: 'https://github.com/{{user}}',
};
