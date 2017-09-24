import axios from "axios";
const ROOT_URL = 'https://hacker-news.firebaseio.com/v0';

export default class Api {
  static fetchTopStories () {
    return axios.get(`${ROOT_URL}/topstories.json`)
      .then(response => {
        return response.data
      })
      .catch(err => {
        let error = err;
        error.message = "Top stories fetch failed!";
        throw error;
      });
  }

  static fetchStory (id) {
    return axios.get(`${ROOT_URL}/item/${id}.json`)
      .then(response => {
        return response.data
      })
      .catch(err => {
        let error = err;
        error.message = `Story id: ${id} fetch failed!`;
        throw error;
      });
  }

  static fetchComment (id) {
    return axios.get(`${ROOT_URL}/item/${id}.json`)
      .then(response => {
        return response.data
      })
      .catch(err => {
        let error = err;
        error.message = `Comment id: ${id} fetch failed!`;
        throw error;
      });
  }
}
