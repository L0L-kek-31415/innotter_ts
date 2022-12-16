import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import { PageState } from "../../store/reducers/pageReducer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { search } from "../../action/page/search";
import pageService from "../../services/pageService";

interface ITag {
  id: number;
  name: string;
}

export function Eblan() {
  const [articles, setArticles] = useState([]);
  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  var pages = null;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  pages = useSelector<RootState, PageState>((state) => state.pages).pages;

  useEffect(() => {
    pageService
      .getTags()
      .then((resp: any) => resp.data)
      .then((resp) => setArticles(resp));
  }, []);

  const HandleSubmit = async (e: any) => {
    var el = document.getElementsByTagName("select")[0];
    var tags = getSelectValues(el) || "";
    dispatch(search(uuid, tags, name, navigate));
  };

  function getSelectValues(select: any) {
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        return `${opt.value}`.toString();
      }
    }
    return "";
  }

  return (
    <div>
      <div style={{ padding: "100px" }}>
        <select name="tags" id="tags" multiple>
          {articles.map((article: ITag) => {
            return <option value={article.id}>{article.name}</option>;
          })}
        </select>
        <input
          type="text"
          id="uuid"
          placeholder="uuid"
          onChange={(e) => setUuid(e.target.value)}
        />
        <input
          type="text"
          id="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={HandleSubmit}>FIND</button>
      </div>
    </div>
  );
}
