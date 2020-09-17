export const statusEnum = {
    STARTED: 1,
    PAUSED: 0,
    STOPPED: -1, // Timebox stopped for reason other than finished
    FINISHED: -2 // End of timebox list reached
}

export const completionEnum = {
    COMPLETED: 1,
    IN_PROGRESS: 0,
    NOT_COMPLETED: -1
}