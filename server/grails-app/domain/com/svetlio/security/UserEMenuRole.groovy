package com.svetlio.security

import grails.gorm.DetachedCriteria
import groovy.transform.ToString

import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class UserEMenuRole implements Serializable {

	private static final long serialVersionUID = 1

	UserEMenu userEMenu
	Role role

	@Override
	boolean equals(other) {
		if (other instanceof UserEMenuRole) {
			other.userEMenuId == userEMenu?.id && other.roleId == role?.id
		}
	}

    @Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (userEMenu) {
            hashCode = HashCodeHelper.updateHash(hashCode, userEMenu.id)
		}
		if (role) {
		    hashCode = HashCodeHelper.updateHash(hashCode, role.id)
		}
		hashCode
	}

	static UserEMenuRole get(long userEMenuId, long roleId) {
		criteriaFor(userEMenuId, roleId).get()
	}

	static boolean exists(long userEMenuId, long roleId) {
		criteriaFor(userEMenuId, roleId).count()
	}

	private static DetachedCriteria criteriaFor(long userEMenuId, long roleId) {
		UserEMenuRole.where {
			userEMenu == UserEMenu.load(userEMenuId) &&
			role == Role.load(roleId)
		}
	}

	static UserEMenuRole create(UserEMenu userEMenu, Role role, boolean flush = false) {
		def instance = new UserEMenuRole(userEMenu: userEMenu, role: role)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(UserEMenu u, Role r) {
		if (u != null && r != null) {
			UserEMenuRole.where { userEMenu == u && role == r }.deleteAll()
		}
	}

	static int removeAll(UserEMenu u) {
		u == null ? 0 : UserEMenuRole.where { userEMenu == u }.deleteAll() as int
	}

	static int removeAll(Role r) {
		r == null ? 0 : UserEMenuRole.where { role == r }.deleteAll() as int
	}

	static constraints = {
	    userEMenu nullable: false
		role nullable: false, validator: { Role r, UserEMenuRole ur ->
			if (ur.userEMenu?.id) {
				if (UserEMenuRole.exists(ur.userEMenu.id, r.id)) {
				    return ['userRole.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['userEMenu', 'role']
		version false
	}
}
