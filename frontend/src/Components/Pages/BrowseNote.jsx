import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../reusable/Card";
import FilterData from "../reusable/FilterData";
import { UserContext } from "../Context/UserContext";
import { apiGet } from "../../lib/api";



const BrowseNote = () => {
  const { inputData } = useContext(UserContext);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiGet("/notes/list.php", {
      q: inputData || "",
      limit: 50,
      offset: 0,
    })
      .then((data) => {
        if (cancelled) return;
        setNotes(data.data || []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [inputData]);

  return (
    <div className="w-full flex  gap-10 ">
      <div className="flex w-1/4 ">
        <FilterData />
      </div>

      <div className="flex  flex-col w-full">
        {inputData && inputData.length > 0 && (
          <h1>
            Showing results for: <strong>{inputData}</strong>
          </h1>
        )}

        {error && <div className="text-red-600 text-sm">{error}</div>}
        {loading && <div className="py-6">Loading...</div>}

        {!loading && (
          <div className="grid  w-full items-center gap-50 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 m-auto">
            {notes.map((n) => (
              <Link to={`/note/${n.id}`} key={n.id}>
                <Card
                  title={n.title}
                  subCode={n.subject_code}
                  author={n.author_name}
                  rating={n.rating}
                  rate={n.min_active_price ?? n.base_price}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseNote;

