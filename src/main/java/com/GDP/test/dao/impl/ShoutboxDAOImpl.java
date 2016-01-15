package com.GDP.test.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Transactional;

import com.GDP.test.dao.ShoutboxDAO;
import com.GDP.test.model.Shoutbox;

public class ShoutboxDAOImpl extends HibernateDaoSupport implements ShoutboxDAO {

	@Override
    @Transactional
    public void postMessage(Shoutbox sb) {
        getHibernateTemplate().save(sb);
    }

    @Override
    @Transactional
    public List<Shoutbox> getMessage() {
        List<Shoutbox> list = new ArrayList<Shoutbox>();  
        list = getHibernateTemplate().loadAll(Shoutbox.class);
        return list;
    }

}
