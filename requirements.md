## The Requirements of project

1. Need to develop a query processing server.
2. Transport is passed in the constructor, and clustering settings
3. The server can work both in one process and generate child processes to process requests.
4. Inter-process communication needs to be implemented.
5. Using the functionality of the `cluster` module is not a good idea. The preferred option is spawning processes via `child_process`.
6. Life control of child processes should be present as an option.
7. It should be possible to `enable`/`disable` the re-creation of processes in case of a crash.
8. It is preferable to see different incoming request balancing modes.
9. It doesn't matter if `http`, `ws`, `tcp` or a simple socket is all isolated in the transport.
10. The only thing that the request processing service knows is the type of transport connection, permanent or temporary, and based on this creates the necessary configuration. well, and also on what clustering mode was set.
11. No need to link to any frameworks or non-standard libraries. Everything is implemented using built-in nodejs `modules`.