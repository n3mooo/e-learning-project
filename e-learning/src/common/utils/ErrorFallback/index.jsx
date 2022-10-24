export default function ErrorFallback({ error, resetErrorBoundary }) {
    console.log(error.message);
    resetErrorBoundary();
    // return (
    //     <div role='alert' style={{ padding: "20px 30px" }}>
    //         <p>Something went wrong:</p>
    //         <pre>{error.message}</pre>
    //         <button
    //             onClick={resetErrorBoundary}
    //             style={{
    //                 fontWeight: "500",
    //                 fontSize: "1rem",
    //                 border: "1px solid rgba(0,0,0,0.22)",
    //                 borderRadius: "0.3rem",
    //                 padding: "5px 10px"
    //             }}>
    //             Try again
    //         </button>
    //     </div>
    // );
}
