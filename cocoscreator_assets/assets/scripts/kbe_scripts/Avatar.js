/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/

var KBEngine = require("kbengine");

KBEngine.Avatar = KBEngine.Entity.extend(
    {
        __init__ : function()
        {
            this._super();
            if(this.isPlayer()) {
                KBEngine.Event.fire("enterScene", KBEngine.app.entity_uuid, this.id, this);
            }
        },
                   
        onEnterWorld : function()
        {
            this._super();
            if(this.isPlayer()) {
                KBEngine.Event.fire("onAvatarEnterWorld", KBEngine.app.entity_uuid, this.id, this);
            }		
        },

        stopWalk: function(pos)
        {
            cc.log("0000 avatar %d stop walk", this.id);
            var vec3 = new KBEngine.Vector3();
            vec3.x = pos.x;
            vec3.y = pos.y;
            vec3.z = 0.0;
            this.cellCall("stopWalk", pos);
        },

        onStopWalk: function(pos)
        {
            cc.log("0000 other avatar %d stop walk", this.id);
            var v2 = new cc.Vec2();
            v2.x = pos.x;
            v2.y = pos.y;
            KBEngine.Event.fire("otherAvatarOnStopWalk", this.id, v2);
        },

        jump : function()
	    {
		    this.cellCall("jump");
        }, 

        onJump : function()
	    {
            cc.log("0000 avatar %d otherAvatarOnJump", this.id);
		    KBEngine.Event.fire("otherAvatarOnJump", this);
        }, 

        onPickUpItem : function(itemID)
        {
            cc.log("0000 other avatar %d pick up item=%d", this.id, itemID);
            KBEngine.Event.fire("otherAvatarOnPickUpItem", this.id, itemID);
        },

        pickUpItem : function(itemID)
	    {
            cc.log("0000 avatar %d pick up item=%d", this.id, itemID);
		    this.cellCall("pickUpItem", itemID);
        }, 
          
        throwItem : function(itemID, force)
        {
            cc.log("0000 avatar %d throw item=%d", this.id, itemID);
            var vec3 = new KBEngine.Vector3();
            vec3.x = force.x;
            vec3.y = force.y;
            vec3.z = 0.0;
		    this.cellCall("throwItem", itemID, vec3);
        },
         
        onThrowItem : function(itemID, force)
        {
            var v2 = new cc.Vec2();
            v2.x = force.x;
            v2.y = force.y;
            cc.log("0000 other avatar %d throw item=%d", this.id, itemID);
		    KBEngine.Event.fire("otherAvatarThrowItem", this.id, itemID, v2);
        },

        onNewTurn : function(eid)
	    {
            cc.log("0000 avatar %d newTurn", this.id);
		    KBEngine.Event.fire("newTurn", eid);
        }, 

        newTurn : function()
	    {
            cc.log("0000 avatar %d newTurn", this.id);
            this.cellCall("newTurn");
        }, 
    });
    
    
    