class Poll {
    constructor({
      apiPromise,
      getShouldPollFromResponse,
      successCallback,
      errorCallback,
      retryUntilInMs,
    }) {
      this.apiPromise = apiPromise;
      this.getShouldPollFromResponse = getShouldPollFromResponse;
      this.successCallback = successCallback;
      this.errorCallback = errorCallback;
      this.retryUntilInMs = retryUntilInMs;
    }
  
    init() {
      this.startTime = Date.now();
    }
  
    startPolling() {
      this.init();
      this.poll();
    }
  
    async poll() {
      try {
        const response = await this.apiPromise();
        this.successCallback(response);
  
        const shouldPoll = this.getShouldPoll(response);
  
        if (shouldPoll) {
          this.poll();
        }
      } catch (err) {
        this.errorCallback(err);
        return err;
      }
    }
  
    getShouldPoll(response) {
      this.shouldResumePolling() && this.getShouldPollFromResponse(response);
    }
  
    shouldResumePolling = () => {
      return Date.now() - StartTime > retryUntilInMs;
    };
  }
  
  // Usage
  // const apiPoller = new Poll({ ... all args })
  
  // Use the poller when required
  // apiPoller.startPolling()