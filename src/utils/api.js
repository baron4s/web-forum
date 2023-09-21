import axios from 'axios';
import ApiEndPoint from '../config/api-endPoint';

const forum = (() => {
  function getUserToken() {
    return localStorage.getItem('token');
  }

  function setUserToken(userToken) {
    localStorage.setItem('token', userToken);
  }

  async function register(name, email, password) {
    try {
      const response = await axios.post(`${ApiEndPoint.register}`, {
        name,
        email,
        password,
      });

      const { data: message } = response;

      return message;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async function login(email, password) {
    try {
      const response = await axios.post(`${ApiEndPoint.login}`, {
        email,
        password,
      });

      const {
        data: {
          status,
          data: { token },
        },
      } = response;

      return { status, token };
    } catch (error) {
      const { message } = error.response.data;

      throw new Error(message);
    }
  }

  async function getOwnProfile() {
    try {
      const response = await axios.get(`${ApiEndPoint.ownUser}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      const {
        data: {
          data: { user },
        },
      } = response;

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function createThread(title, body, category) {
    try {
      const response = await axios.post(
        `${ApiEndPoint.threads}`,
        {
          title,
          body,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        },
      );

      const {
        data: { message },
      } = response;
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getAllThreads() {
    const response = await axios.get(`${ApiEndPoint.threads}`);
    const {
      data: {
        data: { threads },
      },
    } = response;

    return threads;
  }

  async function getDetailThread(id) {
    const response = await axios.get(`${ApiEndPoint.detailTherad(id)}`);
    const {
      data: {
        data: { detailThread },
      },
    } = response;

    return detailThread;
  }

  async function createComment(id, comments) {
    try {
      const response = await axios.post(
        `${ApiEndPoint.createComment(id)}`,
        {
          content: comments,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        },
      );

      const { data: status } = response;
      return status;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function upVoteThread(id) {
    await axios.post(
      `${ApiEndPoint.upVoteThread(id)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      },
    );
  }

  async function neutraLizeVoteThread(id) {
    await axios.post(
      `${ApiEndPoint.neutralizeVoteThread(id)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      },
    );
  }
  async function downVoteThread(id) {
    await axios.post(
      `${ApiEndPoint.downVoteThread(id)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      },
    );
  }

  async function upVoteComment(threadId, commentId) {
    await axios.post(
      `${ApiEndPoint.upVoteComment(threadId, commentId)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      },
    );
  }

  async function downVoteComment(threadId, commentId) {
    await axios.post(
      `${ApiEndPoint.downVoteComment(threadId, commentId)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      },
    );
  }

  async function neutralizeComment(threadId, commentId) {
    await axios.post(
      `${ApiEndPoint.neutralizeVoteComment(threadId, commentId)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      },
    );
  }

  async function getAllUsers() {
    const response = await axios.get(`${ApiEndPoint.users}`);
    const {
      data: {
        data: { users },
      },
    } = response;

    return users;
  }

  async function getLeaderboards() {
    const response = await axios.get(`${ApiEndPoint.leaderboards}`);
    const {
      data: {
        data: { leaderboards },
      },
    } = response;

    return leaderboards;
  }

  return {
    getUserToken,
    setUserToken,
    register,
    login,
    getOwnProfile,
    createThread,
    getAllThreads,
    getDetailThread,
    createComment,
    getAllUsers,
    upVoteThread,
    downVoteThread,
    neutraLizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeComment,
    getLeaderboards,
  };
})();

export default forum;
