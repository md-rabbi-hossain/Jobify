import React from "react";
import Hero from "./Hero";
import Catagory from "../category/Catagory";
import FeatureJob from "../FeatureJob/FeatureJob";
import Button from "../Helper/Button";

const Home = () => {
  return (
    <div>
      <Hero />
      <Catagory />
      <FeatureJob />
      <section className="mx-auto mt-12 w-[92%] max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-brand px-6 py-10 text-white sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="font-display text-3xl">Hiring?</h2>
            <p className="mt-2 max-w-md text-white/85">
              Add your open role and reach people who are searching right now.
            </p>
          </div>
          <Button text="Post a job" url="/post" variant="accent" />
        </div>
      </section>
    </div>
  );
};

export default Home;
