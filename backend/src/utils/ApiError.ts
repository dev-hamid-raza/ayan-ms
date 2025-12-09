class ApiError extends Error {
    statusCode: number
    data: any
    message: string
    success: boolean
    errors: unknown[]
    override stack?: string | undefined
    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors: unknown[] = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
        this.data = null,
        this.message = message
        this.success = false
        this.errors = errors

        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }