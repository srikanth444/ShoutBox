package com.GDP.test.service;

import java.util.List;


import com.GDP.test.model.Shoutbox;

public interface ShoutboxService {

	public void postMessage(Shoutbox sb);
    public List<Shoutbox> getMessage();
}
