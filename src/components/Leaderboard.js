import React, { useState } from "react";
import "./styles/Leaderboard.css";
import downArrow from "../images/arrow-down.svg";

const Leaderboard = ({ leaderboard, updateLeaderboard, highlightedEntry, colors }) => {
    const [sortBy, setSortBy] = useState("wpm");
    const leaderboardLength = leaderboard.length;

    const handleSort = (field) => {
        setSortBy(field);
    };

    console.log(highlightedEntry)
    console.log(leaderboard)

    const sortedLeaderboard = [...leaderboard];
    sortedLeaderboard.sort((a, b) => b[sortBy] - a[sortBy]);

    const topEntries = sortedLeaderboard.slice(0, 10);
    const highlightedEntryRank = highlightedEntry
        ? sortedLeaderboard.findIndex((entry) => entry.user === highlightedEntry.name && entry.wpm === highlightedEntry.wpm && entry.accuracy === highlightedEntry.accuracy) + 1
        : null;

    const isHighlightedEntryInTop = highlightedEntry && highlightedEntryRank <= 10;

    if (highlightedEntry && !isHighlightedEntryInTop) {
        topEntries.push(highlightedEntry);
    }

    return (
        <div className="leaderboard">
            <h1 className="leaderboard_title">Leaderboard 🏆</h1>
            <table>
                <thead>
                    <tr className="leaderboard_header">
                        <th>Rank</th>
                        <th>User</th>
                        <th onClick={() => handleSort("wpm")}>WPM {sortBy === "wpm" && <img src={downArrow} alt="down arrow" className="down-arrow" />}</th>
                        <th onClick={() => handleSort("accuracy")}>Accuracy {sortBy === "accuracy" && <img src={downArrow} alt="down arrow" className="down-arrow" />}</th>
                    </tr>
                </thead>
                <tbody>
                    {topEntries.map((entry, index) => {
                        const isHighlighted =
                            highlightedEntry &&
                            entry.user === highlightedEntry.user &&
                            entry.wpm === highlightedEntry.wpm &&
                            entry.accuracy === highlightedEntry.accuracy;
                        // console.log(entry, highlightedEntry, isHighlighted)
                        const rank = isHighlighted && !isHighlightedEntryInTop ? highlightedEntryRank : index + 1;

                        return (
                            <tr
                                key={index}
                                className="leaderboard_row"
                                style={isHighlighted ? { color: colors.highlight } : {}}
                            >
                                <td className="leaderboard_rank">{rank}</td>
                                <td>{entry.user}</td>
                                <td>{entry.wpm}</td>
                                <td>{entry.accuracy}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <p> Total entries: {leaderboardLength}</p>
        </div>
    );
};

export default Leaderboard;