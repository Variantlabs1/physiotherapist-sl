import "./ClientData.scss";

const ClientData = () => {
    return (
        <div className="container1">
            <div className="client">
                <img className="img" src="https://via.placeholder.com/70x70" />
                <div className="name">Ronald</div>
            </div>

            <div className="details">
                <div className="row">
                    <div className="element">
                        <h1>Email</h1>
                        <input />
                    </div>
                    <div className="element">
                        <h1>Phone No.</h1>
                        <input />
                    </div>
                </div>
                <div className="row">
                    <div className="element">
                        <h1>Gender</h1>
                        <input />
                    </div>
                    <div className="element">
                        <h1>Height</h1>
                        <input />
                    </div>
                </div>

                <div className="row">
                    <div className="element">
                        <h1>Age</h1>
                        <input />
                    </div>
                    <div className="element">
                        <h1>About</h1>
                        <input />
                    </div>
                </div>
                <div className="row">
                    <div className="element">
                        <h1>Weight</h1>
                        <input />
                    </div>
                    <div className="element">
                        <h1>Duration</h1>
                        <input />
                    </div>
                </div>
                <div className="row">
                    <div className="element">
                        <h1>Plan</h1>
                        <input />
                    </div>
                    <div className="element">
                        <h1>Location</h1>
                        <input />
                    </div>
                </div>
            </div>

            <div className="buttons">
                <div className="btn1">
                    <button>Go Back</button>
                </div>
                <div className="btn2">
                    <button>Remove Client</button>
                </div>
            </div>
        </div>
    );
};

export default ClientData;
