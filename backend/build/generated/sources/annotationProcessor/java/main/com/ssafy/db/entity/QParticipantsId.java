package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QParticipantsId is a Querydsl query type for ParticipantsId
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QParticipantsId extends BeanPath<ParticipantsId> {

    private static final long serialVersionUID = -140912355L;

    public static final QParticipantsId participantsId = new QParticipantsId("participantsId");

    public final NumberPath<Long> roomSeq = createNumber("roomSeq", Long.class);

    public final StringPath userId = createString("userId");

    public QParticipantsId(String variable) {
        super(ParticipantsId.class, forVariable(variable));
    }

    public QParticipantsId(Path<? extends ParticipantsId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QParticipantsId(PathMetadata metadata) {
        super(ParticipantsId.class, metadata);
    }

}

