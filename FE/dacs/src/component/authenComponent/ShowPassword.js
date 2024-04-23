import eyeSlash from "../../assets/images/eye-slash.png";
function showPassword({ passInput }) {
    const handleShowPassword = (e) => {
        if (passInput === null) {
            return;
        }
        if (passInput.type === "password") {
            passInput.type = "text";
            e.target.src = eyeSlash;
        } else {
            passInput.type = "password";
            e.target.src =
                "https://cdn.builder.io/api/v1/image/assets/TEMP/a8819b1cf48d19a6e95bc57cb5d373ec0162742f3cfe62b7ec31b90b0b48de06?apiKey=9349475655ee4a448868f824f5feb11d&";
        }
    };
    return (
        <>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8819b1cf48d19a6e95bc57cb5d373ec0162742f3cfe62b7ec31b90b0b48de06?apiKey=9349475655ee4a448868f824f5feb11d&"
                alt="Eye icon"
                className="cursor-pointer shrink-0 w-6 aspect-square"
                onClick={handleShowPassword}
            />
        </>
    );
}

export default showPassword;
