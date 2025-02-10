import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  // Load saved candidates from localStorage
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  // Function to remove a candidate
  const removeCandidate = (id: number) => {
    // Filter out the candidate that should be removed
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    
    // Update state and localStorage
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        savedCandidates.map((candidate) => (
          <div key={candidate.id}>
            <h2>{candidate.name || candidate.login}</h2>
            <img src={candidate.avatar_url} alt="Candidate Avatar" width="100" />
            <p>Username: {candidate.login}</p>
            <button onClick={() => removeCandidate(candidate.id)}>-</button> {/* Remove Button */}
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;
