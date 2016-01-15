package com.GDP.test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.GDP.test.model.Shoutbox;
import com.GDP.test.service.ShoutboxService;

@RestController
public class ShoutboxController {


	    @Autowired
	    private ShoutboxService shoutboxservice;

	    @RequestMapping("/")
		public ModelAndView index() {
			return new ModelAndView("shoutbox");
		}
	    
	    
	    @RequestMapping(value = "/postSBMessage.htm", method = RequestMethod.POST)        
	    public void postShout(@RequestBody Shoutbox newmessage) {      
	                                      
	        shoutboxservice.postMessage(newmessage);                      
	    }
	    
	    
	    @RequestMapping(value = "/getSBMessage", method = RequestMethod.GET)        
	    public @ResponseBody List<Shoutbox> getShout() {      
	        List<Shoutbox> list = new ArrayList<Shoutbox>(); 
	    
	        list = shoutboxservice.getMessage();
	        return list;
	    }
	    
	    
}
