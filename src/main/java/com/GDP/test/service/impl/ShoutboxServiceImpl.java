package com.GDP.test.service.impl;

import java.util.List;

import com.GDP.test.dao.ShoutboxDAO;
import com.GDP.test.model.Shoutbox;
import com.GDP.test.service.ShoutboxService;

public class ShoutboxServiceImpl implements ShoutboxService {

	ShoutboxDAO shoutboxdaoimpl;

    public ShoutboxDAO getShoutboxdaoimpl() {
        return shoutboxdaoimpl;
    }

    public void setShoutboxdaoimpl(ShoutboxDAO shoutboxdaoimpl) {
        this.shoutboxdaoimpl = shoutboxdaoimpl;
    }
	

    @Override
    public void postMessage(Shoutbox sb) {
        shoutboxdaoimpl.postMessage(sb);
    }

    @Override
    public List<Shoutbox> getMessage() {
        return shoutboxdaoimpl.getMessage();
    }

}
