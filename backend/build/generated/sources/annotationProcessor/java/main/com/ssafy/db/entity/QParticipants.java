package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QParticipants is a Querydsl query type for Participants
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QParticipants extends EntityPathBase<Participants> {

    private static final long serialVersionUID = -1037016990L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QParticipants participants = new QParticipants("participants");

    public final QParticipantsId participantsId;

    public QParticipants(String variable) {
        this(Participants.class, forVariable(variable), INITS);
    }

    public QParticipants(Path<? extends Participants> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QParticipants(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QParticipants(PathMetadata metadata, PathInits inits) {
        this(Participants.class, metadata, inits);
    }

    public QParticipants(Class<? extends Participants> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.participantsId = inits.isInitialized("participantsId") ? new QParticipantsId(forProperty("participantsId")) : null;
    }

}

