package com.GDP.test.dao;

import java.util.List;


import com.GDP.test.model.Shoutbox;



public interface ShoutboxDAO {

	public void postMessage(Shoutbox sb);
    public List<Shoutbox> getMessage();
}
