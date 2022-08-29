import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const Traverse = () => {
    const [dataOnScreen, setDataOnScreen] = useState("")
  let id = useRef();
  useEffect(() => {}, []);
  axios.defaults.headers.common["X-Auth-Token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  // GET REQUEST
  function getTodos() {
    // axios({
    //   method: 'get',
    //   url: 'https://jsonplaceholder.typicode.com/todos',
    //   params: {
    //     _limit: 5
    //   }
    // })
    //   .then(res => showOnScreen(res))
    //   .catch(err => console.error(err));

    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
        timeout: 5000,
      })
      .then((res) => showOnScreen(res))
      .catch((err) => console.error(err));
  }

  // POST REQUEST
  function addTodo() {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: "New Todo",
        completed: false,
      })
      .then((res) => showOnScreen(res))
      .catch((err) => console.error(err));
  }

  // PUT/PATCH REQUEST
  function updateTodo() {
    axios
      .patch("https://jsonplaceholder.typicode.com/todos/1", {
        title: "Updated Todo",
        completed: true,
      })
      .then((res) => showOnScreen(res))
      .catch((err) => console.error(err));
  }

  // DELETE REQUEST
  function removeTodo() {
    axios
      .delete("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => showOnScreen(res))
      .catch((err) => console.error(err));
  }

  // SIMULTANEOUS DATA
  function getData() {
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      ])
      .then(axios.spread((todos, posts) => showOnScreen(posts)))
      .catch((err) => console.error(err));
  }

  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "sometoken",
      },
    };

    axios
      .post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: "New Todo",
          completed: false,
        },
        config
      )
      .then((res) => showOnScreen(res))
      .catch((err) => console.error(err));
  }

  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "Hello World",
      },
      transformResponse: axios.defaults.transformResponse.concat((data) => {
        data.title = data.title.toUpperCase();
        return data;
      }),
    };

    axios(options).then((res) => showOnScreen(res));
  }

  // ERROR HANDLING
  function errorHandling() {
    axios
      .get("https://jsonplaceholder.typicode.com/todoss", {
        // validateStatus: function(status) {
        //   return status < 500; // Reject only if status is greater or equal to 500
        // }
      })
      .then((res) => showOnScreen(res))
      .catch((err) => {
        if (err.response) {
          // Server responded with a status other than 200 range
          showOnScreen(err.response.data);
          showOnScreen(err.response.status);
          showOnScreen(err.response.headers);

          if (err.response.status === 404) {
            alert("Error: Page Not Found");
          }
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  }

  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();

    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        cancelToken: source.token,
      })
      .then((res) => showOnScreen(res))
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          showOnScreen("Request canceled", thrown.message);
        }
      });

    if (true) {
      source.cancel("Request canceled!");
    }
  }

  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    (config) => {
      showOnScreen(
        `${config.method.toUpperCase()} request sent to ${
          config.url
        } at ${new Date().getTime()}`
      );

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // AXIOS INSTANCE
  const axiosInstance = axios.create({
    // Other custom settings
    baseURL: "https://jsonplaceholder.typicode.com",
  });
  // axiosInstance.get('/comments').then(res => showOnScreen(res));
  //show data on ui
  const showOnScreen = (param) => {
    // console.log(id.current= JSON.stringify(pa);
    
    setDataOnScreen(JSON.stringify(param) );
  };

  return (
    <div>
      <h1 className="display-4 text-center mb-3 ">Axios Crash Course</h1>
      <div className="flex grow justify-center gap-3">
        <button className="btn btn-primary " onClick={getTodos} id="get">
          GET
        </button>
        <button className="btn btn-info" onClick={addTodo} id="post">
          POST
        </button>
        <button className="btn btn-warning" onClick={updateTodo} id="update">
          PUT/PATCH
        </button>
        <button className="btn btn-danger" onClick={removeTodo} id="delete">
          DELETE
        </button>
        <button className="btn btn-secondary" onClick={getData} id="sim">
          Sim Requests
        </button>
        <button
          className="btn btn-secondary"
          onClick={customHeaders}
          id="headers"
        >
          Custom Headers
        </button>
        <button
          className="btn btn-secondary"
          onClick={transformResponse}
          id="transform"
        >
          Transform
        </button>
        <button
          className="btn btn-secondary"
          onClick={errorHandling}
          id="error"
        >
          Error Handling
        </button>
        <button className="btn btn-secondary" onClick={cancelToken} id="cancel">
          Cancel
        </button>
      </div>
      <div className="w-3/4 m-auto overflow-auto " ref={id}>{dataOnScreen}</div>
    </div>
  );
};

export default Traverse;
