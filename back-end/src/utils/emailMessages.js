export const WelcomeEmail = (userName, protocol, headers, token) => {
    return `
    <div>
        <h1>Welcome ${userName}</h1>
        <a href = '${protocol}://${headers.host}/auth/confirmEmail/${token}'> Confirm Your Email</a>
    </div>`
}

export const sendCodeEmail = (code) => `<h2>Your code is ${code}</h2>`;  