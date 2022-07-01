import { Button, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useFetch } from "../CustomHooks/useFetch";

const GithubUserSearch = () => {
  const [query, setQuery] = useState("Prajwal");
  const [pages, setPages] = useState(1);
  const { loading, data, error } = useFetch(
    `https://api.github.com/search/users?q=${query}&&page=${pages}`
  );
  console.log(loading, data, error);

  const handlePageChange = (value) => {
    setPages(pages + value);
  };
  return (
    <div>
      <Heading>Github User Search</Heading>
      <Input
        placeholder={"Find user name....."}
        onChange={(e) => setQuery(e.target.value)}
      ></Input>
      <br />
      <Button onClick={() => handlePageChange(-1)}>Previous</Button>{" "}
      <Button onClick={() => handlePageChange(1)}>Next</Button>
      <br />
      {loading && <p>Loading...</p>}
      {!loading &&
        data &&
        data?.items?.map((item) => {
          return (
            <div key={item.id} style={{ display: "flex" }}>
              <h3>{item.login}</h3>
              <h5>{item.url}</h5>
              <img src={item.avatar_url} alt="" style={{ width: "150px" }} />
            </div>
          );
        })}
    </div>
  );
};

export default GithubUserSearch;
