import { useState, useEffect } from "react";
import { searchGithub } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem("savedCandidates") || "[]")
  );

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      setCandidate(users[0]); // Display first candidate
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const updatedList = [...savedCandidates, candidate];
      setSavedCandidates(updatedList);
      localStorage.setItem("savedCandidates", JSON.stringify(updatedList));
      fetchCandidate();
    }
  };

  return (
    <div>
      {candidate ? (
        <>
          <h1>{candidate.name || candidate.login}</h1>
          <img src={candidate.avatar_url} alt="Candidate Avatar" width="100" />
          <p>Username: {candidate.login}</p>
          <button onClick={saveCandidate}>+</button>
          <button onClick={fetchCandidate}>-</button>
        </>
      ) : (
        <h2>No more candidates available</h2>
      )}
    </div>
  );
};

export default CandidateSearch;
