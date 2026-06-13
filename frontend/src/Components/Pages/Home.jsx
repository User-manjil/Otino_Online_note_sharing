import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../reusable/Title";
import Card from "../reusable/Card";
import Banner from "../reusable/Banner";
import { apiGet } from "../../lib/api";



const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiGet("/notes/list.php", { limit: 12, offset: 0 })
      .then((data) => {
        if (cancelled) return;
        setNotes(data.data || []);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full     ">
      <div className="w-full h-90 bg-yellow-400 rounded-xl">
        <Banner />
      </div>

      <div className="flex flex-col ">
        <Title heading="Featured Notes" />

        {loading ? (
          <div className="py-6">Loading...</div>
        ) : (
          <div className="grid items-center w-full gap-10   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 m-auto ">
            {notes.map((e) => (
              <Link to={`/note/${e.id}`} key={e.id}>
                <Card
                  title={e.title}
                  subCode={e.subject_code}
                  author={e.author_name}
                  rating={e.rating}
                  rate={e.min_active_price ?? e.base_price}
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <Title heading="How it works" />
        <div className="flex w-full bg-amber-400 h-70 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Home;

