import React from "react";
//import UserService from "../services/user.service";
const Home = () => {
//   const [content, setContent] = useState("");
//   useEffect(() => {
//     UserService.getPublicContent().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();
//         setContent(_content);
//       }
//     );
//   }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>This is Home page</h3>
      </header>
    </div>
  );
};
export default Home;