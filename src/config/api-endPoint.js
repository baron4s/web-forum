import config from './config';

const ApiEndPoint = {
  register: `${config.BASE_URL}/register`,
  login: `${config.BASE_URL}/login`,

  users: `${config.BASE_URL}/users`,
  ownUser: `${config.BASE_URL}/users/me`,

  threads: `${config.BASE_URL}/threads`,
  detailTherad: (id = null) => `${config.BASE_URL}/threads/${id}`,
  createComment: (id) => `${config.BASE_URL}/threads/${id}/comments`,
  neutralizeVoteThread: (id = null) => `${config.BASE_URL}/threads/${id}
/neutral-vote`,
  upVoteThread: (id = null) => `${config.BASE_URL}/threads/${id}/up-vote`,
  downVoteThread: (id = null) => `${config.BASE_URL}/threads/${id}/down-vote`,
  upVoteComment: (threadId, CommentId) => {
    return `${config.BASE_URL}/threads/${threadId}/comments/${CommentId}/up-vote`;
  },
  downVoteComment: (threadId, CommentId) => {
    return `${config.BASE_URL}/threads/${threadId}/comments/${CommentId}/down-vote`;
  },
  neutralizeVoteComment: (threadId, CommentId) => {
    return `${config.BASE_URL}/threads/${threadId}/comments/${CommentId}/neutral-vote`;
  },
  leaderboards: `${config.BASE_URL}/leaderboards`,
};

export default ApiEndPoint;
