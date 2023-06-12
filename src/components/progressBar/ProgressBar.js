export const ProgressBar = (props) => {
    const { completed } = props;

    const Body = {
        backgroundColor: '#e0e0de',
        height: '10vw',
        width: '70vw',
        marginTop: '5%',
    };

    const Fill = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: '#4BB34B',
        textAlign: 'right',
        padding: 0,
        transition: 'width 1s ease-in-out',
    };

    const Percent = {
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        width: '20vw',
    };

    return (
        <div className={'Container'}>
            <div style={Body}>
                <div style={Fill}>
                    <div style={Percent}>{`${completed}%`}</div>
                </div>
            </div>
        </div>
    );
};
