import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
    const [data, setData] = useState({
        seenIndexes: [],
        values: {},
        index: "",
    });

    useEffect(() => {
        fetchValues();
    }, []);

    const fetchValues = async () => {
        const response = await axios.get("/api/values/current");
        const seenIndexes = await axios.get("/api/values/all");
        setData({
            ...data,
            seenIndexes: seenIndexes.data,
            values: response.data,
        });
    };

    const renderSeenIndexes = () => {
        return data.seenIndexes.map(({ number }) => number).join(", ");
    };

    const renderValues = () => {
        const entries = [];
        for (let key in data.values) {
            entries.push(
                <div key={key}>
                    index {key} : result {data.values[key]}
                </div>
            );
        }
        return entries;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("/api/values", {
            index: data.index,
        });
        setData({ ...data, index: "" });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index</label>
                <input
                    type="text"
                    value={data.index}
                    onChange={(event) =>
                        setData({ ...data, index: event.target.value })
                    }
                />
                <button>Submit</button>

                <h3>Index I have seen : </h3>
                {renderSeenIndexes()}

                <h3>Calculated Value : </h3>
                {renderValues()}
            </form>
        </div>
    );
};

export default Fib;
